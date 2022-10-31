import i18n from 'i18n'
import {
  queryContributionAsync,
  queryPaymentRequisitionAsync,
} from '../queries/contribution'
import { queryLoanApplicationAsync } from '../queries/loan'
import entityDetails from './entity_details'
import request from 'request'
import { usersApi } from '../queries/users'

const onesignal_url = `https://onesignal.com/api/v1/notifications`

// Ishq Ibrahim wants to join Alajeseku Cooperatives
// {{actor_username}} {{action_type}} {{entity_description}}
export function buildNotificationMessage(entity_type, data) {
  let processed_data = entityDetails[entity_type].pre_process
    ? entityDetails[entity_type].pre_process(data)
    : data
  //   console.log(processed_data)
  //   let message = i18n.__(
  //     '{{actor_username}} {{action_type}} {{entity_description}}',
  //     processed_data,
  //   )
  let message = i18n.__(entityDetails[entity_type].message_prop, processed_data)
  return message
}

export function getMemberRequest(data = {}) {
  return {
    actor_username: data.firstname + ' ' + data.lastname,
    action_type: data.action_type,
    entity_description: data.entity_description,
  }
}

// async get data
export async function asyncGetData(
  list = [],
  society_id = '',
  entity_type = '',
) {
  let finalList = []

  for (let i = 0; i < list.length; i++) {
    let current = list[i]
    if (
      entity_type.toString() === '4' ||
      entity_type.toString() === '5' ||
      entity_type.toString() === '6'
    ) {
      finalList.push(
        queryPaymentRequisitionAsync({
          query_type: 'by_status_req',
          req_id: current.entity_id,
          society_id,
        }),
      )
    } else if (entity_type.toString() === '7') {
      finalList.push(
        queryContributionAsync({
          query_type: 'summary_by_reference',
          society_id,
          reference: current.entity_id,
        }),
      )
    } else if (
      entity_type.toString() === '8' ||
      entity_type.toString() === '9' ||
      entity_type.toString() === '10' ||
      entity_type.toString() === '11'
    ) {
      finalList.push(
        queryLoanApplicationAsync({
          query_type: 'by_id',
          society_id,
          loan_id: current.entity_id,
        }),
      )
    } else if (
      entity_type.toString() === '12' ||
      entity_type.toString() === '13' ||
      entity_type.toString() === '14'
    ) {
      finalList.push(
        queryLoanApplicationAsync({
          query_type: 'by_id',
          society_id,
          loan_id: current.entity_id,
        }),
      )
    }
  }

  let endResult = await Promise.all(finalList)
  // console.log('End Result Returned', endResult)
  return endResult
}

// generate a list of notification messages from a dataset
export async function generateNotificationList(list = [], society_id) {
  // console.log('First Resp', resp)
  let formattedResp = {}
  list.forEach((i) => {
    let keysFound = Object.keys(formattedResp)
    // console.log('checking', i.entity_type)
    // console.log(
    //   'checking: resp',
    //   keysFound,
    //   'Looking for ',
    //   i.entity_type,
    //   keysFound.includes(i.entity_type.toString()),
    // )

    if (keysFound.includes(i.entity_type.toString())) {
      formattedResp[i.entity_type] = formattedResp[i.entity_type].concat(i)
    } else {
      formattedResp[i.entity_type] = [i]
    }
  })

  // console.log('Formatted', formattedResp)

  let generalList = []

  for (let j = 0; j < Object.keys(formattedResp).length; j++) {
    let current = Object.keys(formattedResp)[j]
    // let item = await asyncGetData(formattedResp[current])
    // generalList.push(item)
    generalList.push(asyncGetData(formattedResp[current], society_id, current))
    // console.log('Adding promises', current, j)
  }

  const finalResult = await Promise.all(generalList)
  console.log('All promises now resolved')
  // console.log('General List Completed', finalResult)

  let flatList = []
  // [ k[ j[ l[TextRow] ] ], [ [ [TextRow] ] ] ]
  for (let k = 0; k < finalResult.length; k++) {
    let current1 = finalResult[k]
    // console.log(current1)
    for (let j = 0; j < current1.length; j++) {
      let current2 = current1[j]
      let current_entity = Object.keys(formattedResp).find((a, x) => x === k)
      // console.log(current_entity, 'current_entity')
      let notifObj = formattedResp[current_entity][j]
      // console.log(notifObj)
      for (let l = 0; l < current2.length; l++) {
        let current3 = current2[l]
        // console.log(current3)
        notifObj.message = buildNotificationMessage(current_entity, current3)
        notifObj.data = current3
        // flatList.push({ data: current3, notifObj })
        flatList.push(notifObj)
      }
    }
  }

  return flatList
}

export function sendNotification(userId = '', notification = '') {
  usersApi(
    {
      id: userId,
      query_type: 'info',
    },
    (data) => {
      let userObj = data[0]
      const App_id = process.env.ONESIGNA_APP_ID
      const Api_key = process.env.ONESIGNAL_API_KEY

      const options = {
        method: 'POST',
        body: JSON.stringify({
          app_id: App_id,
          contents: { en: notification },
          include_player_ids: [userObj.deviceId], //userObj.deviceId
          data: { source: 'message' },
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Api_key,
        },
      }

      request(options, (err, response, body) => {
        if (!err) {
          console.log('Push notification sent')
          console.log('RESPONSE', response, body)
        } else {
          console.log('Error sending push notification')
          console.log('ERROR', err)
        }
      })
    },
  )
}
