import * as React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Button } from 'react-native';
import axios from 'axios'

function ProjectVue({ navigator }) {
  const apiKey = require('../API_KEYS.json').OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [events, setEvents] = useState([]);


  const handleCheckSend = async () => {
    setPromptResponse('');
    const prompt = `Une reformulation synthétique en une seule phrase du projet suivant ${textInput} est `;
    console.log(prompt);
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 216,
      temperature: 0.3,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const text = response.data.choices[0].text;
    setTextOutput(text)
    console.log(`API Call Reponse: ${text}`)
    setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': textInput}]);
    setTextInput('');
  };

  const handleObjectiveSend = async () => {
    setPromptResponse('');
    const prompt = `Pour atteindre l'objectif suivant ${textOutput}, un bon planning habdomadaire est le suivant, avec les durées horaires à consacrer. 
    En appliquant le format suivant: Lundi :\n - activité 1 (durée XXhXX)\n - activité 2 (durée XXhXX)\n Mardi :\n - activité 1 (durée XXhXX)\n - activité 2 (durée XXhXX)\n etc.`;
    console.log(prompt);
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.3,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const text = response.data.choices[0].text;
    setPromptResponse(text)
    console.log(`API Call Reponse: ${text}`)
    setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': textInput}]);
    setTextInput('');
  };

  const extractEvents = () => {
    const timeRegexp = /([0-1]?[0-9]|2[0-3])h[0-5][0-9]/;
    const wordList = promptResponse.split("/");
    console.log(wordList);
    const dayIndexes = [-1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < wordList.length; i++) {
      wordList[i] = wordList[i].trim();
      if (wordList[i] == "Lundi") {dayIndexes[0] = i}
      else if (wordList[i] == "Mardi") {dayIndexes[1] = i}
      else if (wordList[i] == "Mercredi") {dayIndexes[2] = i}
      else if (wordList[i] == "Jeudi") {dayIndexes[3] = i}
      else if (wordList[i] == "Vendredi") {dayIndexes[4] = i}
      else if (wordList[i] == "Samedi") {dayIndexes[5] = i}
      else if (wordList[i] == "Dimanche") {dayIndexes[6] = i}
    }
    for (let j = 0; j < dayIndexes.length; j++) {
      events.push({
        'day': wordList[dayIndexes[j]],
        'duration': wordList.slice(dayIndexes[j]+1,dayIndexes[j+1]).join().match(timeRegexp),
        'activity': wordList.slice(dayIndexes[j]+1,dayIndexes[j+1]).join(),
      })
    }
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {textOutput.length < 1 ? null :
        <View style={styles.outputWrapper}>
          {promptResponse.length < 1 ? <Text style={styles.output} numberOfLines={25}>
                Peux-tu confirmer que j'ai bien compris ton objectif:
              {textOutput}
              </Text>: 
              <Text style={styles.output} numberOfLines={25}>
                Voici un planning pour t'aider à atteindre ton objectif:
              {promptResponse}
              </Text> }

          {promptResponse.length < 1 ? <Button
                title="C'est bien mon objectif"
                color='green'
                onPress={() => handleObjectiveSend()}
              />:
              <View>
              <Button
                title="L'intégrer à mon calendrier"
                color='orange'
                onPress={() => extractEvents()}
              />
              <Button
                title="Regénérer un horaire"
                color='red'
                onPress={() => handleObjectiveSend()}
              /></View> }

            </View>}
            <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
            <TextInput style={styles.input} placeholder={'Décris ton projet'} value={textInput} onChangeText={text => setTextInput(text)}/>
            <TouchableOpacity onPress={() => handleCheckSend()}>
            <View style={styles.submitButton}>
                <Text style={styles.addText}>✓</Text>
            </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  };

const styles = StyleSheet.create({
  validateButoon: {
    position: 'absolute',
    bottom: 40
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 280,
    height: 60,
  },
  outputWrapper: {
    position: 'absolute',
    top: 10,
    width: '100%',
    height: '100%',
  },
  output: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  submitButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

export default ProjectVue;