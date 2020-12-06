import { store } from 'react-notifications-component';


export const addNotification = (title, message, type) => {
    store.addNotification({
        title,
        type,
        insert: "bottom",
        message,
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        showIcon: true,
        dismiss: {
          duration: 5000,
          onScreen: true,
          pauseOnHover: true
        }
    })
}