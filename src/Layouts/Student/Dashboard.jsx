import React, { useState, useEffect } from 'react';
import DashboardPage from '../../Pages/Student/DashboardPage/DashboardPage';

const Dashboard = () => {
    // مثال على الحالة
    const [user, setUser] = useState(null);

    useEffect(() => {
        // مثال: جلب بيانات المستخدم أو تنفيذ تأثير جانبي معين
       //  setUser({ name: 'John Doe', role: 'Student' });
    }, []);

    return (
        <>
            {/* تمرير الحالة أو البيانات إذا لزم الأمر */}
            <DashboardPage user={user} />
        </>
    );
};

export default Dashboard;
