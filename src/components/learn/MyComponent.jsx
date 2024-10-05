//JSX : only one parent
//use "fragment" to fix if you have two parents
//use className instead of class
//if use style inline : use camel case instead of kebab case
import './style.css';

const MyComponent = () => {
    return (
        <>
            <div>Nguyen Vu Ba Duy</div>
            <div className="child" style={{ borderRadius: "10px" }}>child</div>
        </>
    );
}

export default MyComponent;