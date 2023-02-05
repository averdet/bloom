import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

const OpenAiApiKey = "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";

function ProjectVue({ navigator}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
        >
            <TextInput style={styles.input} placeholder={'Décris ton projet'} value={null} onChangeText={text => setTask(text)} />
            <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
                <Text style={styles.addText}>✓</Text>
            </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }

const styles = StyleSheet.create({
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
    width: 250,
  },
  addWrapper: {
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