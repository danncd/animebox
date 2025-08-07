

import { notFound } from 'next/navigation';
import AnimePageContent from './components/AnimePageContent';

type Props = {
    params: Promise<{ id: string }>;
}

const AnimePage = async ({ params, }: Props) => {

    const {id} = await params;

    if (isNaN(Number(id))) {
		notFound();
	}

    return (
        <div className='max-w-[1200px] mx-auto px-4'>
            <AnimePageContent mal_id={Number(id)}/>
        </div>
    );
};

export default AnimePage;