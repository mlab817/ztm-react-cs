const DB = {
  appointments: {
    appointment1: {
      status: 'pending', // move to history once cert is sent
      videoCall: {},
      medicalCertificate: '', // link
    }
  },
  messages: {
    message1: {
      from: '',
      to: '',
      message: '',
      sentAt: ''
    }
  },
  history: {},
  patients: {
    patient1: {
      firstName: 'First',
      lastName: 'Name',
      profile: {
        birthday: '',
        address: ''
      }, // all other information
      messages: {},
      appointments: {},
      history: {}
    }
  },
  videoCalls: {
    video1: {
      url: ''
    }
  }
}

export default DB