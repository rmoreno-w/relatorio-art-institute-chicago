import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import {
    anoInicioObraMaisAntigaAtom,
    dadosPizzaAtom,
    dadosTreeMapAtom,
    mediaIdadeObrasAtom,
    numberOfResultsNaQueryDoBdAtom,
} from '../../../pages';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function Dashboard() {
    const [numberOfResultsNaQueryDoBd, setnumberOfResultsNaQueryDoBd] = useAtom(numberOfResultsNaQueryDoBdAtom);
    const [mediaIdadeObras, setmediaIdadeObras] = useAtom(mediaIdadeObrasAtom);
    const [anoInicioObraMaisAntiga, setanoInicioObraMaisAntiga] = useAtom(anoInicioObraMaisAntigaAtom);
    const [dadosPizza, setdadosPizza] = useAtom(dadosPizzaAtom);
    const [dadosTreeMap, setdadosTreeMap] = useAtom(dadosTreeMapAtom);

    // const [dadosPizzaSeries, setDadosPizzaSeries] = useState([]);
    // const [dadosPizzaLabels, setDadosPizzaLabels] = useState([]);
    // const { data, isFetching, isFetched } = useQuery('dadosGraficoPizza', async () => {
    //     const response = await apiClient.get('userDashboard');

    //     // let x = response.data.dadosPizza.map((cidade: any) => {
    //     //     return cidade._count.place_of_origin;
    //     // });
    //     // setDadosPizzaSeries(x);

    //     // x = response.data.dadosPizza.map((cidade: any) => {
    //     //     return cidade.place_of_origin;
    //     // });
    //     // setDadosPizzaLabels(x);
    //     return;
    // });

    let maximoTipoObra = 0;
    dadosTreeMap[0].data.forEach((par: any) => {
        //console.log(par.y)
        par.y > maximoTipoObra ? (maximoTipoObra = par.y) : null;
    });
    console.log(dadosTreeMap);

    return (
        <div className='w-full grid grid-cols-2 gap-12'>
            <div className='w-full flex justify-between gap-12 col-span-2'>
                <article className='flex-col flex border-2 border-projectPurple/50 rounded-2xl py-8 px-8 gap-6 bg-projectPurple text-projectWhite'>
                    <h2 className='text-lg'>Número de Obras</h2>
                    <p className='text-3xl text-center font-bold'>
                        {numberOfResultsNaQueryDoBd.toLocaleString().replace(',', '.')}
                    </p>
                </article>
                <article className='flex flex-col justify-between border-2 border-projectPurple/50 rounded-2xl py-8 px-8 gap-6'>
                    <h2 className='text-lg'>Data da Obra Mais Antiga</h2>
                    <p className='text-3xl text-center font-bold'>
                        {anoInicioObraMaisAntiga.toLocaleString().includes('-')
                            ? `${anoInicioObraMaisAntiga
                                  .toLocaleString()
                                  .replace('-', '')
                                  .replace(',', '.')
                                  .concat(' a.C.')}`
                            : anoInicioObraMaisAntiga}
                    </p>
                </article>
                <article className='flex flex-col border-2 border-projectPurple/50 rounded-2xl py-8 px-8 gap-6'>
                    <h2 className='text-lg'>Média de Idade das Obras</h2>
                    <p className='text-3xl text-center font-bold'>
                        {mediaIdadeObras} <span>Anos</span>
                    </p>
                </article>
            </div>
            <div className='border-2 border-projectPurple/50 rounded-2xl p-4'>
                <p className='flex justify-center font-semibold mb-4'>
                    Número de obras por localidade (10 mais expressivos)
                </p>
                <Chart
                    options={{
                        series: dadosPizza.series,
                        labels: dadosPizza.labels,
                        colors: [
                            '#7D5BA6',
                            '#A65B5F',
                            '#D7CEAB',
                            '#84A65B',
                            '#58a4b0',
                            '#E9ACA7',
                            '#D9B36F',
                            '#688e26',
                            '#bfc0c0',
                            '#fabc2a',
                        ],
                        legend: {
                            fontSize: '14px',
                            fontFamily: 'Montserrat, sans-serif',
                            onItemHover: {
                                highlightDataSeries: false,
                            },
                            height: 250,
                        },
                        noData: {
                            text: 'Carregando dados...',
                            style: {
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '14px',
                            },
                        },
                    }}
                    series={dadosPizza.series}
                    type='donut'
                    height={400}
                />
            </div>
            <div className='border-2 border-projectPurple/50 rounded-2xl p-4'>
                <p className='flex justify-center font-semibold mb-4'>Tipos de Obra (10 mais expressivos)</p>
                <Chart
                    options={{
                        plotOptions: {
                            treemap: {
                                colorScale: {
                                    ranges: [{ from: 0, to: maximoTipoObra, color: '#4d2979' }],
                                },
                            },
                        },
                        legend: {
                            fontSize: '14px',
                            fontFamily: 'Montserrat, sans-serif',
                            onItemHover: {
                                highlightDataSeries: false,
                            },
                            height: 250,
                        },
                        noData: {
                            text: 'Carregando dados...',
                            style: {
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '14px',
                            },
                        },
                    }}
                    series={dadosTreeMap}
                    type='treemap'
                    height={400}
                />
            </div>
        </div>
    );
}
