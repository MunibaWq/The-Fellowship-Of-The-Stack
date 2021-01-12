const [image,setImage]=useState('')
    function encodeImageFileAsURL(element) {
        console.log(element)
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result)
        }
        reader.readAsDataURL(file);
    }
return (<input onChange={(e) => { encodeImageFileAsURL(e) }} type={"file"}/>
            <img src={image}/>)