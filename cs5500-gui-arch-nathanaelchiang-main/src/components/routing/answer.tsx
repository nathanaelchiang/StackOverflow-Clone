import React from 'react';
import PageClass from './index';
import AnswerPage from '../Main/answerPage';
import { ApplicationInterface, NoParamHandler } from '../../types/types';

export default class AnswerPageClass extends PageClass {

    /**
     * @returns JSX.Element containing the AnswerPage component or question not found component.
     * @override
    */
    public getContent() {
        return (
            <div>
                <h1>Question Not Found</h1>
                <p>The question you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    public getSelected() {
        return "";
    }
}