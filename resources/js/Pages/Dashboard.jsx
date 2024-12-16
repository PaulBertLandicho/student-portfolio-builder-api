import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProfilePic from '@/Layouts/pages/ProfilePic';
import Skills from '@/Layouts/pages/Skills';
import Professions from '@/Layouts/pages/Professions';
import Projects from '@/Layouts/pages/Projects';
import Contact from '@/Layouts/pages/Contact';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        
        >

            <ProfilePic />
            <Skills />
            <Professions />
            <Projects />
            <Contact />
        </AuthenticatedLayout>
    );
}
