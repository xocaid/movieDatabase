import { useEffect, useState } from "react";
const API_URL = 'https://dog.ceo/api/breeds/image/random';
const API_URL1 = 'https://dog.ceo/api/breeds/list/all';
const API_URL2 = 'https://dog.ceo/api/breed/{selectedBreed}/images/random';

const Example = () => {
    const [imgUrl, setImgUrl] = useState('');
    const [imgUrls, setImgUrls] = useState('');
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState('');

    function dogImg() {
        fetch(API_URL).then(res => res.json()).then(data => setImgUrl(data.message))
    }

    function dogImgs(breed: string) {
        fetch(API_URL2.replace('{selectedBreed}', selectedBreed)).then(res => res.json()).then(data => setImgUrls(data.message))
    }

    const renderSelectedDog = (event: any) => {
        setSelectedBreed(event.currentTarget.value);
    }
    useEffect(() => {
        dogImgs(selectedBreed)
    }, [selectedBreed])


    function dogBreeds() {
        fetch(API_URL1)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const arr = [];
                for (const x in data.message) {
                    if (data.message[x].length > 0) {
                        for (let j = 0; j < data.message[x].length; j++) {
                            const example = `${data.message[x][j]} ${x}`
                            arr.push(example)
                        }
                    } else {
                        arr.push(x);
                    }
                }
                setBreeds(arr)
            })
    }
    return (
        <div>
            <button onClick={dogImg}>Want to see a dog?</button>
            {imgUrl ? (<img src={imgUrl} />) : 'sorry'}
            <button onClick={dogBreeds}>Want to see a certain BREED of dog?</button>
            <label htmlFor='dogbreeds'>
                <select onChange={renderSelectedDog}>
                    {breeds.map(breed => <option>{breed}</option>)}
                </select>
            </label>
            {imgUrls ? (<img src = {imgUrls}/>): 'Try Again'}
        </div>
    )
}
export default Example;