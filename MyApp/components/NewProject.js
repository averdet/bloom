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
    const prompt = `Pour atteindre l'objectif suivant ${textOutput}, un bon planning habdomadaire est le suivant, avec les durées horaires à consacrer. Ennonce seulement et simplement quoi faire chaque jour pendant quelle durée `;
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
    const extractedEvents = textOutput.match(
      /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g
    );
    setEvents(extractedEvents);
    console.log(extractEvents);
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <KeyboardAvoidingView 
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