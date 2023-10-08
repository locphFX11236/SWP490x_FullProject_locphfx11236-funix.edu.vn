import { memo } from "react";
import { Routes, Route } from "react-router-dom";

import * as views from "../views";

const MainLayout = views.MainLayout;
const HomePage = memo(views.HomePage);
const OrganizationPage = memo(views.OrganizationPage);
const OrganDetail = memo(views.OrganDetail);
const ProgramPage = memo(views.ProgramPage);
const ProgDetail = memo(views.ProgDetail);
const NewsPage = memo(views.NewsPage);
const NewsDetail = memo(views.NewsDetail);
const AuthPage = memo(views.AuthPage);

const PublicRouter = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="organizations" element={<OrganizationPage />} />
            <Route path="organizations/:id" element={<OrganDetail />} />
            <Route path="programs" element={<ProgramPage />} />
            <Route path="programs/:id" element={<ProgDetail />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="LogIn" element={<AuthPage />} />
            <Route path="SignUp" element={<AuthPage />} />
            <Route path="Forget" element={<AuthPage />} />
        </Route>

        {/* Error path v6 */}
        <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
);

export default memo(PublicRouter);
