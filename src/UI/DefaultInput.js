import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.stye, !props.valid ? styles.invalid : null, props.disabled ? styles.disabled : null]}
    />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        marginTop: 8,
        marginBottom: 8 
    }, 
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: "red"
    },
    disabled: {
        backgroundColor: "#eee",
        color: "#aaa",
        borderColor: "#aaa"
    }
});

export default DefaultInput;