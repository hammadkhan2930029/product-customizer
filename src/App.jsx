// import { useState } from 'react';
// import CustomizerModal from './components/Customizer/CustomizerModal';

// function App() {
//   const [finalImage, setFinalImage] = useState(null);

//   return (
//     <>
//       {!finalImage ? (
//         <CustomizerModal onSave={setFinalImage} />
//       ) : (
//         <div>
//           <h2>Preview</h2>
//           <img src={finalImage} width={300} />
//         </div>
//       )}
//     </>
//   );
// }

// export default App;
import Customizer3D from './components/khanthreeCustomizer/Customizer3D';

function App() {
  return (
    <div style={{backgroundColor:'gray',width:'100%',}}>
      <Customizer3D />
    </div>
  )
}

export default App;
