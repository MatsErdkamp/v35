import React, { useState, useEffect } from 'react';
import { loadComponents } from './v35';

const App = () => {
 
  const [components, setComponents] = useState([]);
  const [structure, setStructure] = useState({});

  useEffect(() => {
    loadComponents().then(({  newStructure }) => {
      setStructure(newStructure);
    });
  }, []);

  return (
    <div className="App w-screen p-2 min-h-screen flex flex-col justify-center items-center">
      <div className=" bg-35blue-500 rounded-lg flex flex-col items-center justify-center min-h-[60vh] w-full bg-primary-blue text-white">
        <h1 className="text-8xl font-bold">v35</h1>
        <small className="text-2xl">35® component library</small>
      </div>

      <div className='flex flex-col justify-center  w-full bg-primary-blue text-white pb-24'>
        {Object.entries(structure).map(([folder, files]) => (
          <div key={folder} >
            <h1 className="w-10/12 m-auto mt-24 text-6xl font-bold text-35neutral-950 mb-8">{folder}</h1>
            {Object.entries(files).map(([fileName, components]) => (
             
              <div key={fileName}>
                <h2 className="m-auto mt-4 w-10/12 text-2xl font-semibold text-35neutral-950 mb-4">{fileName}</h2>
       
                <div className=' w-10/12 m-auto  justify-between  rounded-lg flex flex-row gap-2'>
                  {Object.entries(components.stories).map(([storyName, variants]) => (
                    <div  key={storyName} className="mb-4 flex-1 ">
                      <h3 className="text-sm gap-2  text-center mb-2 font-semibold  bg-35neutral-300 text-35neutral-800 rounded-md px-2">{storyName}</h3>
                      {variants.map((variant, index) => (

                        <div key={index} className="mb-2">
                          <components.component key={index} {...variant.args} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
   
    </div>
 
    )}

export default App;
