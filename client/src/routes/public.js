import { Routes, Route } from 'react-router-dom';

const PublicRouter = ({
    MainLayout,
    HomePage,
    ProgramPage,
    OrganizationPage,
    NewsPage
}) => (
    <Routes>
        <Route path='/' element={ MainLayout } >
            <Route index element={ <HomePage /> } />
            <Route path='/programs' element={ <ProgramPage /> } />
            <Route path='/organizations' element={ <OrganizationPage /> } />
            <Route path='/news' element={ <NewsPage /> } />
        </Route>

        {/* Error path v6 */}
        <Route path='*' element={ <h1>Error</h1> } />
    </Routes>
);

export default PublicRouter;