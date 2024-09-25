import { useParams } from 'react-router-dom';

export default function Result() {
    const params = useParams();
    const category = params.category;

    return (
        <main>
            <h1>This is ResultPage params is {category}</h1>
        </main>
    );
}
