# Anki-GPT

Anki-GPT is a web app that automates the process of creating Anki Cards.
Simply paste in a body of text from which Anki Cards will be generated from. The advanced LLM creates questions and answers derived from the text and formats them into a downloadable CSV file that can be imported into the Anki App.

The web app can be viewed here: [https://anki-gpt4.vercel.app/](https://anki-gpt4.vercel.app/)

## What is Anki

Anki is a popular spaced repetition software designed to help people remember things more efficiently. It is often used for studying a wide range of topics, including languages, medical and scientific terminology, history, and more. The software is based on the principle of spaced repetition, where the frequency with which a fact is presented is adjusted based on how easily it was remembered in the past.

## Use Case

Anki-GPT takes the pain away from creating Anki cards. Previously each card would have to be manually created and inputted into the Anki software. This is a slow process and limits the speed at which new information gets added to the testing base.

Using this new approach the user can either directly generate Anki Cards from a corpus of text they are studying or alternativly generate Anki Cards from the notes they have taken themselves. The latter approach seems to generate higher quaility Anki Cards.

## How It Works

This web app is built with Typescript, uses the Next.js framework and hosted on Vercel.

The UI is made up of custom built React components. The inputted text is added to an exiting prompt which is fed to the LLM via an api. This API is a next.js edge function which allows for the longer timeout duration before a response is needed. When querying a LLM the response duration can take up to 30 seconds and would timeout a serverless function.

The response is parsed into JSON format, stored in a stateful array and displayed. The stateful array allows the easy deletion of Questions that the user does not wish to use.

Finally the Anki Card data is converted to a Blob object which enables it to be downloaded by the user as a CSV file.

This CSV file can be easily inputted into the Anki Software.
