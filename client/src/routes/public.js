import { Routes, Route } from 'react-router-dom';

const PublicRouter = ({
    MainLayout,
    HomePage,
    OrganizationPage,
    OrganDetail,
    ProgramPage,
    ProgDetail,
    NewsPage,
    NewsDetail,
    AuthPage,
}) => (
    <Routes>
        <Route path='/' element={ <MainLayout /> } >
            <Route index element={ <HomePage /> } />
            <Route path='organizations' element={ <OrganizationPage /> } />
            <Route path='organizations/:id' element={ <OrganDetail /> } />
            <Route path='programs' element={ <ProgramPage /> } />
            <Route path='programs/:id' element={ <ProgDetail /> } />
            <Route path='news' element={ <NewsPage /> } />
            <Route path='news/:id' element={ <NewsDetail /> } />
            <Route path='LogIn' element={ <AuthPage /> } />
            <Route path='SignUp' element={ <AuthPage /> } />
            <Route path='Forget' element={ <AuthPage /> } />
        </Route>

        {/* Error path v6 */}
        <Route path='*' element={ <h1>Error 404</h1> } />
    </Routes>
);

export default PublicRouter;