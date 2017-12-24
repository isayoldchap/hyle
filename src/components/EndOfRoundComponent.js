import React from react;
import RaisedButton from 'material-ui/raised-button';

class EndOfRoundComponent extends React.Component {
    render() {
        return (
            <div>
                <p>End of round</p>
                <RaisedButton value={"Please Continue"} />
            </div>
        );
    }
}