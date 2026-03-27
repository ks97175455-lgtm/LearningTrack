const API = "http://localhost:5000/modules";

export async function getModules() {

  try{

    const res = await fetch(API);

    if(!res.ok){
      throw new Error("Failed to fetch modules");
    }

    return await res.json();

  }catch(error){

    console.error(error);
    return [];

  }

}

export async function updateModule(id, data){

  try{

    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if(!res.ok){
      throw new Error("Failed to update module");
    }

    return await res.json();

  }catch(error){

    console.error(error);

  }

}

export async function addModule(module){

  try{

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(module)
    });

    if(!res.ok){
      throw new Error("Failed to add module");
    }

    return await res.json();

  }catch(error){

    console.error(error);

  }

}