const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


const func = async () => {
    try {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
    } catch (error) {
    console.error(error)
    }
  }
  func()

// create function to send an osc message
const sendOSCMessage = async () => {
    try {
        const response = await window.versions.sendOSCMessage('/start', 1);
        console.log(response)
    }
    catch (error) {
        console.error(error)
    }

}
  document.getElementById("myButton").addEventListener("click", sendOSCMessage);