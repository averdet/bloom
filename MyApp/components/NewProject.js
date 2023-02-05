import * as React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Button, ActivityIndicator } from 'react-native';
import axios from 'axios'

function ProjectVue({ navigation, route }) {
  const apiKey = require('../API_KEYS.json').OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckSend = async () => {
    setIsLoading(true);
    setPromptResponse('');
    const prompt = `Une reformulation synthétique en une seule phrase du projet suivant ${textInput} est `;
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 216,
      temperature: 0.2,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const text = response.data.choices[0].text;
    setTextOutput(text)
    setTextInput('');
    setIsLoading(false);
  };

  const handleObjectiveSend = async () => {
    setIsLoading(true);
    setPromptResponse('');
    const prompt = `Pour atteindre l'objectif suivant ${textOutput}, un bon planning hebdomadaire est le suivant, avec les durées horaires à consacrer. 
    En appliquant le format suivant: Lundi :\n - activité 1 (durée XXhXX)\n Mardi :\n - activité 2 (durée XXhXX)\n etc.`;
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1512,
      temperature: 0.8,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const text = response.data.choices[0].text;
    setPromptResponse(text)
    setTextInput('');
    setIsLoading(false);
  };

  const extractEvents = () => {
    //console.log(promptResponse);
    const timeRegexp = /([0-1]?[0-9]|2[0-3])h([0-5][0-9])?/;
    const wordList = promptResponse.split(/(?=[A-Z-ÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ])/);
    const dayIndexes = [-1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < wordList.length; i++) {
      wordList[i] = wordList[i].replace("\n", "").replace(" :- ", "").replace("- ", "").replace(" : ", "");
      if (wordList[i] == "Lundi") {dayIndexes[0] = i}
      else if (wordList[i] == "Mardi") {dayIndexes[1] = i}
      else if (wordList[i] == "Mercredi") {dayIndexes[2] = i}
      else if (wordList[i] == "Jeudi") {dayIndexes[3] = i}
      else if (wordList[i] == "Vendredi") {dayIndexes[4] = i}
      else if (wordList[i] == "Samedi") {dayIndexes[5] = i}
      else if (wordList[i] == "Dimanche") {dayIndexes[6] = i}
    }
/*     console.log(wordList);
    console.log(dayIndexes); */
    console.log(wordList);
    for (let j = 0; j < dayIndexes.length; j++) {
      for (let k = dayIndexes[j]+1; k < dayIndexes[j+1]; k++) {
        if (wordList[k].length > 0) {
          events.push({
            'day': wordList[dayIndexes[j]],
            'activity': wordList[k],
            //'duration': wordList[k].match(timeRegexp),
            'duration': `${j*2+7}:00`,
          })
        }
      }
    }


    for (let i = 0; i < events.length; i++) {
      route.params.data.push(
        {"achievement": 0, "completed": false, "description": "", "fatigue": 0, "productivity": 0, "time": events[i].duration, "title": events[i].activity}
      );
    }
    navigation.goBack();
  };


    return (
      <>
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
                onPress={() => {isLoading ? null : handleObjectiveSend()}}
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
                onPress={() => {isLoading ? null : handleObjectiveSend()}}
              /></View> }

            </View>}
            <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
            <TextInput style={styles.input} placeholder={'Décris ton projet'} value={textInput} onChangeText={text => setTextInput(text)}/>
            <TouchableOpacity onPress={() => {isLoading ? null : handleCheckSend()}}>
            <View style={styles.submitButton}>
                <Text style={styles.addText}>✓</Text>
            </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading && <ActivityIndicator size="large" />}
      </View>
      </View>
      </>
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