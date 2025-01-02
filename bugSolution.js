To prevent the race condition, consider using a server-side atomic increment operation or a different data structure altogether. Firebase Cloud Functions provide a robust solution:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.incrementCounter = functions.https.onCall(async (data, context) => {
  const counterRef = admin.database().ref('counter');
  const transactionResult = await counterRef.transaction((currentCount) => {
    if(currentCount === null){
      return 1
    } else {
      return currentCount + 1
    }
  });
  return { count: transactionResult.snapshot.val()};
});
```
This Cloud Function handles the increment atomically on the server, eliminating the race condition present in client-side transactions. The client calls this function to increment the counter, ensuring data integrity.