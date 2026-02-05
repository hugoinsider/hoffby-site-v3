import { createClient } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Use Admin Client to bypass RLS (so we can see enrollments of all users)
        const adminSupabase = createAdminClient();

        // Fetch all students
        const { data: students, error } = await adminSupabase
            .from('profiles')
            .select('*')
            .eq('role', 'student');

        console.log("Fetched Users:", students);

        if (error) throw error;

        // Enhance with enrollment counts and details
        const enhancedStudents = await Promise.all(students.map(async (student) => {
            const { data: enrollments, count } = await adminSupabase
                .from('enrollments')
                .select('course_id', { count: 'exact' })
                .eq('user_id', student.id);

            return {
                ...student,
                enrollmentsCount: count || 0,
                enrolledCourses: enrollments?.map(e => e.course_id) || []
            };
        }));

        return NextResponse.json({ data: enhancedStudents });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
