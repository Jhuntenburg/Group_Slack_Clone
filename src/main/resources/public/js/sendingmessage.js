import { API_URL } from './constants.js';
import { channelId } from './channels.js';
import { fetchMessages } from './fetchmessages.js';

//message json
//{
//  "id" : 1,
//  "content" : "I need the slide decks from Dolio's lecture today\n",
//  "timestamp" : "2023-08-30T10:46:00Z",
//  "user" : {
//    "id" : 1,
//    "login" : null
//  },
//  "channel" : {
//    "id" : 1,
//    "name" : null,
//    "description" : null,
//    "workspace" : null,
//    "users" : [ ]
//  }
//}

//////////////////////////////////////////////////////////////////////////////////
// This is the auto refresh section, uncomment to activate.
// Literally just does the fetch every 2 seconds

function fetchMessagesPeriodically() {
  fetchMessages(channelId);
}
setInterval(fetchMessagesPeriodically, 2000);

//////////////////////////////////////////////////////////////////////////////////

function userId() {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var userid = url.searchParams.get('userid');
    console.log(userid);
    return userid;
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
    return '0';
  }
}

//console.log(userJson);
document.addEventListener('DOMContentLoaded', function () {
  const messageTextarea = document.getElementById('message');
  const sendButton = document.getElementById('sendButton');
  const responseMessage = document.getElementById('responseMessage');

  sendButton.addEventListener('click', async function () {
    // Make the event listener async along with the fetchUser
    const message = messageTextarea.value;

    if (message.trim() === '') {
      //      fetchMessages(channelId);
      return;
    }

    try {
      // Anything other the TimeStamp and Content MIGHT be optional.
      // We may be grabbing everything from the DTO???????
      const data = {
        timestamp: new Date().toISOString(),
        content: message,
        user: {
          id: parseInt(userId()),
          login: null,
          firstName: 'John', // userJson.firstname
          lastName: 'Doe', // may no longer be necessary
        },
        channel: {
          id: channelId,
          name: 'default',
          description: 'default',
        },
      };

      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      responseMessage.innerText = 'SENT';
      fetchMessages(channelId);
    } catch (error) {
      console.error('Error:', error);
      responseMessage.innerText = 'An error occurred while sending the message.';
    }

    messageTextarea.value = '';
  });
});
