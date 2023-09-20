# ec463-mini-project

## Video Demo Link
Youtube- https://drive.google.com/file/d/1gh6rS_f-21t7SuxcNhCLY2tn9gAzylK9/view?usp=sharing

## Sources
Sources for code:
1. Followed this Youtube video to setup a basic chat application: https://youtu.be/zQyrwxMPm88?si=3-XAQjReVSC51Ojy
2. Used this GeeksForGeeks site to setup the chat to allow for users to search up other users and message them individually: https://www.geeksforgeeks.org/user-to-user-private-chat-app-using-reactjs-and-firebase-without-socket-programming/
3. ChatGPT was used for overall bug solving as well as for doing parts of the CSS for the code.

## Agile Development
The link to our JIRA board used for development is here: https://pranetsh.atlassian.net/jira/software/projects/KAN/boards/1

## How To Run Application

### ` npm start `

Run command npm start when in terminal to run the project.

## Design Decisions

Design decisions documented here instead of a wiki because repository was initially private and GitHub Free does not allow for wikis with private repos.

Initially React Native was considered as a possible direction. However, setup of the development environment as well as other design decisions resulted in pivoting to a React application.

Firebase was used as backend required was not complex enough to consider using something like Flask to create one by ourselves. Instead Firebase was used for Google login authentication as well as for storage in Google Firestore. It was easier to use a BaaS.

React was used for frontend because we were most familiar with it and using the tutorials we were able to figure out how to use various React Hooks to make a functional frontend.
