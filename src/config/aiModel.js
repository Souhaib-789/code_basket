const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Analyze the following code snippet and provide a JSON object with the following keys:\n\n- \"description\": Write a concise explanation of what the code does and its overall purpose.\n- \"language\": Identify the programming language and, if applicable, the framework used in the code snippet.\n- \"usage_example\": Provide a practical usage example that shows how to use the code, including sample input and expected output if applicable.\n\nHere is the code snippet:\nimport React, { useState } from 'react';\nimport { View, Text, TouchableOpacity, StyleSheet } from 'react-native';\n\nconst RadioButton = ({ label, selected, onPress }) => {\n  return (\n    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>\n      <View style={[styles.radioCircle, selected && styles.selectedCircle]}>\n        {selected && <View style={styles.innerCircle} />}\n      </View>\n      <Text style={styles.radioLabel}>{label}</Text>\n    </TouchableOpacity>\n  );\n};\n\nconst SimpleRadioButtons = () => {\n  const [selectedOption, setSelectedOption] = useState(null);\n\n  const options = [\n    { id: 1, label: 'Radio Option 1' },\n    { id: 2, label: 'Radio Option 2' },\n    { id: 3, label: 'Radio Option 3' },\n  ];\n\n  return (\n    <View style={styles.container}>\n      {options.map((option) => (\n        <RadioButton\n          key={option.id}\n          label={option.label}\n          selected={selectedOption === option.id}\n          onPress={() => setSelectedOption(option.id)}\n        />\n      ))}\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    margin: 20,\n  },\n  radioContainer: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    marginBottom: 15,\n  },\n  radioCircle: {\n    height: 24,\n    width: 24,\n    borderRadius: 12,\n    borderWidth: 2,\n    borderColor: '#777',\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  selectedCircle: {\n    borderColor: '#2196f3',\n  },\n  innerCircle: {\n    height: 12,\n    width: 12,\n    borderRadius: 6,\n    backgroundColor: '#2196f3',\n  },\n  radioLabel: {\n    marginLeft: 10,\n    fontSize: 16,\n    color: '#333',\n  },\n});\n\nexport default SimpleRadioButtons;\n\nMake sure your output is a valid JSON object.\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"description\": \"This code defines a React Native component called `SimpleRadioButtons` that renders a group of radio buttons. Each radio button consists of a circle, an inner circle (visible only when selected), and a label. The component maintains the state of the selected option and updates it when a radio button is pressed. The `RadioButton` component is a reusable component that displays a single radio button and handles the selection logic.\",\n  \"language\": \"JavaScript\",\n  \"framework\": \"React Native\",\n  \"usage_example\": {\n    \"code\": \"import React from 'react';\\nimport { View } from 'react-native';\\nimport SimpleRadioButtons from './SimpleRadioButtons'; // Assuming SimpleRadioButtons.js is in the same directory\\n\\nconst App = () => {\\n  return (\\n    <View>\\n      <SimpleRadioButtons />\\n    </View>\\n  );\\n};\\n\\nexport default App;\",\n    \"input\": \"No specific input is required. This is a UI component that renders radio buttons.\",\n    \"expected_output\": \"The code will render a UI with three radio button options ('Radio Option 1', 'Radio Option 2', 'Radio Option 3'). Initially, none of the options will be selected. When a user taps on a radio button, its corresponding circle will be filled with a blue inner circle, indicating it is selected. Only one option can be selected at a time. Selecting a new option will deselect the previously selected one.\"\n  }\n}\n```" },
            ],
        },
    ],
});




