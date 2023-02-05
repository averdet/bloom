import * as React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Button } from 'react-native';
import axios from 'axios'

function ProjectVue({ navigator }) {

  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [textPrompt, setTextPrompt] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [events, setEvents] = useState([]);


  const handleCheckSend = async () => {
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
    const prompt = `Pour atteindre l'objectif suivant ${textOutput}, un bon planning habdomadaire est le suivant, avec les durées horaires à consacrer. En appliquant le format suivant: Lundi : - activité 1 (durée XXhXX) - activité 2 (durée XXhXX) / Mardi : - activité 1 (durée XXhXX) - activité 2 (durée XXhXX) etc.`;
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
    extractEvents();
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {promptResponse.length < 1 ?               <Text style={styles.output} numberOfLines={25}>
                Peux-tu confirmer que j'ai bien compris ton objectif:
              {textOutput}
              </Text>: 
              <Text style={styles.output} numberOfLines={25}>
              {promptResponse}
              </Text> }


              <Button
                title="C'est bien mon objectif"
                color='green'
                onPress={() => handleObjectiveSend()}
              />
            </View>
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
    bottom: 60,
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