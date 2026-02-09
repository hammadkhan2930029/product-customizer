const Preview = ({ image, onBack }) => {
    return (
        <>
            <h2>Final Shirt Design</h2>
            <img src={image} width={300} />
            <br />
            <button onClick={onBack}>Back</button>
        </>
    );
}
export default Preview;
