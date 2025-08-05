

import AnimePageContent from './components/AnimePageContent';

type Props = {
    params: Promise<{ id: string }>;
}

const AnimePage = async ({ params, }: Props) => {

    const {id} = await params;

    return (
        <div className='max-w-[1200px] mx-auto px-2'>
            <AnimePageContent mal_id={Number(id)}/>
        </div>
    );
};

export default AnimePage;