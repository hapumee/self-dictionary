import React from 'react';

export default {
    title: 'NOTICE'
};

function Notice() {
    return (
        <div>
            <p><b>NOTICE</b></p>
            <hr />
            <p>New that the story 'Welcome' and 'Click Action Example' are demo for usage of storybook,</p>
            <p>just eliminate those stories.</p>
        </div>
    );
}


export const notice = () => <Notice />;
