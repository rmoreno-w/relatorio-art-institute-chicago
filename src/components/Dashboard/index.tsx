import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { apiClient } from '../../../services/axios';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function Dashboard() {
    const { data: dadosPizza, isFetching } = useQuery('dadosGraficoPizza', async () => {
        const response = await apiClient.get('userDashboard');

        const dadosDoBd = response.data.dadosPizza;

        return dadosDoBd;
    });

    const dadosPizzaSeries =
        dadosPizza &&
        dadosPizza.map((cidade: any) => {
            return cidade._count.place_of_origin;
        });
    const dadosPizzaLabels =
        dadosPizza &&
        dadosPizza.map((cidade: any) => {
            return cidade.place_of_origin;
        });

    return (
        <div className='w-full grid grid-cols-2 gap-4'>
            <div className='border-2 border-gray-500/30 rounded-3xl p-4'>
                <p className='flex justify-center font-semibold mb-4'>
                    Número de obras por localidade (10 mais expressivos)
                </p>
                <Chart
                    options={{
                        series: dadosPizzaSeries,
                        labels: dadosPizzaLabels,
                        colors: [
                            '#7D5BA6',
                            '#ff3d4a',
                            '#1B1B1E',
                            '#0094C6',
                            '#58a4b0',
                            '#2e0219',
                            '#ffe381',
                            '#688e26',
                            '#bfc0c0',
                            '#fabc2a',
                        ],
                        legend: {
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                            onItemHover: {
                                highlightDataSeries: false,
                            },
                        },
                    }}
                    series={dadosPizzaSeries}
                    type='donut'
                    height={400}
                />
            </div>
            <span className='w-1/2'>Sim</span>
            <span>Claro</span>
            <span>Nao</span>
        </div>
    );
}
