
import './style.css';

//Using {} in HTML to execute a JavaScript command or display the value of a variable

const MyComponent = () => {
    // const test = "Nguyen Vu Ba Duy";
    // const test = 123;
    // const test = true;
    // const test = undefined;
    // const test = null;


    //Using JSON.stringify
    // const test = [1, 2, 3, 4];
    const test = {
        name: "Nguyen Vu Ba Duy",
        age: "18"
    }
    return (
        <>
            <div>{JSON.stringify(test)} & React</div>
            <div className="child" style={{ borderRadius: "10px" }}>child</div>
        </>
    );
}

export default MyComponent;