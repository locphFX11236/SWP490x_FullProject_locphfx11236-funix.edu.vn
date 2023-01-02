import { Routes, Route } from 'react-router-dom';

import { HomePage, NewsPage, OrganizationPage, ProgramPage } from "../views/pages";

const PrivateRouter = ({layout}) => (
    <Routes>
        <Route path='/' element={ layout } >
            <Route index element={ <HomePage /> } />
            <Route path='/programs' element={ <ProgramPage /> } />
            <Route path='/organizations' element={ <OrganizationPage /> } />
            <Route path='/news' element={ <NewsPage /> } />
        </Route>

        {/* Error path v6 */}
        <Route path='*' element={ <h1>Error</h1> } />
    </Routes>
);

export default PrivateRouter;