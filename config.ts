export const configData = {
  baseUrl: 'https://hrapi.braincraftapps.com',
  frontendUrl: 'https://hr.braincraftapps.com',

  mongo: {
    url: `mongodb+srv://potteryStore:rfSf2bJAAdAUle7W@cluster0.nzlp2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    dbName: 'PotteryStore',
  },
  google: {
    clientId:
      "104443873174-d492ffnchecain2qsvmkrjei3tldobf9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/login/auth/google/callback",
    failUrl : "http://localhost:3000/login",
    successUrl: "http://localhost:3000"
  },
  token: {
    expired_time: '1440 min',
  },
};
