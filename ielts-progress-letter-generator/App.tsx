
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LetterState, StudentInfo } from './types';
import StudentForm from './components/StudentForm';

const INITIAL_STUDENT = (): StudentInfo => ({
  id: uuidv4(),
  name: '',
  strengths: '',
  improvements: '',
  praise: '',
  paidUntil: '',
  nextPaymentPeriod: '',
  nextPaymentAmount: '',
  note: '',
  commitment: '',
  sessionDetails: '',
  strategy: ''
});

const App: React.FC = () => {
  const [state, setState] = useState<LetterState>({
    recipient: 'Cô Tuyết Anna',
    subject: 'Cập nhật tiến độ học IELTS của học viên Tố Uyên, Tạ Khánh, Mai Hương và Thanh Sơn',
    students: [INITIAL_STUDENT()],
    summary: 'Vậy em chuyển cho anh 13.5 triệu vnd vào tài khoản BIDV 1690000157 Lê Hồng Trường tiền học của bạn Tố Uyên từ 2/1/26-1/2/26, 20 buổi của bạn Tạ Khánh, Mai Hương từ 5/12/25 đến 8/1/26, và 20 buổi của bạn Thanh Sơn từ 27/10/25 - 24/1/26',
    conditional: 'Nếu trước ngày 10/2/2026 mà anh chưa nhận được tiền của bạn nào thì anh sẽ ngưng dạy bạn ấy trong một thời gian đến khi nhận được tiền học.',
    wishing: 'chúc bạn Tố Uyên đạt 5.5, bạn Tạ Khánh đạt 5.0 và bạn Mai Hương đạt 5.5, bạn Thanh Sơn đạt 5.5 theo mục tiêu và vào được trường đại học mong ước của mình.',
    signature: 'Thầy Trường\nGiáo viên IELTS'
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleUpdateField = (field: keyof LetterState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateStudent = (id: string, updates: Partial<StudentInfo>) => {
    setState(prev => ({
      ...prev,
      students: prev.students.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const addStudent = () => {
    setState(prev => ({
      ...prev,
      students: [...prev.students, INITIAL_STUDENT()]
    }));
  };

  const removeStudent = (id: string) => {
    setState(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id)
    }));
  };

  const generateLetterText = useCallback(() => {
    let text = `Kính gửi ${state.recipient},\n\n`;
    text += `Thư này là: ${state.subject}\n\n`;

    state.students.forEach((student, index) => {
      const charIndex = String.fromCharCode(65 + index); // A, B, C...
      text += `${charIndex}. Về bạn ${student.name || '[Tên học sinh]'}:\n`;
      if (student.strengths) text += `- Điểm mạnh: ${student.strengths}\n`;
      if (student.improvements) text += `- Điểm cần khắc phục: ${student.improvements}\n`;
      if (student.praise) text += `- Khen ngợi: ${student.praise}\n`;
      if (student.paidUntil) text += `- Đã đóng tiền học đến ngày: ${student.paidUntil}\n`;
      if (student.nextPaymentPeriod || student.nextPaymentAmount) {
        text += `- Cần đóng từ ngày: ${student.nextPaymentPeriod || '...'} với số tiền là ${student.nextPaymentAmount || '...'}\n`;
      }
      if (student.sessionDetails) text += `- Chi tiết các buổi học: ${student.sessionDetails}\n`;
      if (student.note) text += `- Ghi chú: ${student.note}\n`;
      if (student.commitment) text += `- Cam kết: ${student.commitment}\n`;
      if (student.strategy) text += `- Chiến lược sắp tới: ${student.strategy}\n`;
      text += `\n`;
    });

    if (state.summary) {
      text += `Tóm lại: ${state.summary}\n\n`;
    }

    if (state.conditional) {
      text += `Nếu: ${state.conditional}\n\n`;
    }

    if (state.wishing) {
      text += `Chúc: ${state.wishing}\n\n`;
    }

    text += `Ký tên:\n${state.signature}`;
    return text;
  }, [state]);

  const copyToClipboard = () => {
    const text = generateLetterText();
    navigator.clipboard.writeText(text);
    alert('Đã sao chép nội dung thư vào bộ nhớ tạm! Bạn có thể dán vào Zalo ngay bây giờ.');
  };

  const downloadFile = () => {
    const text = generateLetterText();
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `Bao_cao_IELTS_Co_Tuyet_Anna_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <div className="inline-block p-2 bg-blue-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">IELTS Letter Master</h1>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">Hệ thống tạo thư báo cáo tiến độ học tập chuyên nghiệp dành cho Thầy Trường.</p>
      </header>

      <div className="space-y-8">
        {/* General Info */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Thông tin chung
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Thư này gửi ai?</label>
              <input
                type="text"
                value={state.recipient}
                onChange={(e) => handleUpdateField('recipient', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                placeholder="Ví dụ: Cô Tuyết Anna"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Thư này về cái gì?</label>
              <input
                type="text"
                value={state.subject}
                onChange={(e) => handleUpdateField('subject', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                placeholder="Ví dụ: Cập nhật tiến độ học IELTS của học viên..."
              />
            </div>
          </div>
        </section>

        {/* Students List */}
        <div>
          {state.students.map((student, index) => (
            <StudentForm
              key={student.id}
              student={student}
              index={index}
              onUpdate={handleUpdateStudent}
              onRemove={removeStudent}
            />
          ))}
          <button
            onClick={addStudent}
            className="w-full py-5 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Thêm học sinh/nhóm mới
          </button>
        </div>

        {/* Summary and Closing */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M20 6 9 17l-5-5"/></svg>
            Kết luận & Ký tên
          </h2>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Tóm lại (Tiền học, STK ngân hàng...)</label>
            <textarea
              value={state.summary}
              onChange={(e) => handleUpdateField('summary', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-32 transition-all"
              placeholder="Ví dụ: Vậy em chuyển cho anh 13.5 triệu vào BIDV..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Nếu (Hạn chót đóng học phí...)</label>
            <textarea
              value={state.conditional}
              onChange={(e) => handleUpdateField('conditional', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-24 transition-all"
              placeholder="Ví dụ: Nếu trước ngày 10/2 mà chưa nhận được tiền..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Chúc (Mục tiêu tương lai...)</label>
            <textarea
              value={state.wishing}
              onChange={(e) => handleUpdateField('wishing', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-24 transition-all"
              placeholder="Ví dụ: Chúc bạn Tố Uyên đạt 5.5..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Ký tên</label>
            <textarea
              value={state.signature}
              onChange={(e) => handleUpdateField('signature', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-24 transition-all font-bold"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="sticky bottom-6 flex gap-4 mt-12">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            XUẤT THƯ GỬI ZALO
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-black text-slate-800">Bản thảo hoàn chỉnh</h2>
              </div>
              <button 
                onClick={() => setShowPreview(false)} 
                className="p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-all active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-8 overflow-y-auto bg-slate-50/50 text-slate-800 leading-relaxed whitespace-pre-wrap font-medium text-base border-b selection:bg-blue-100 selection:text-blue-900">
              {generateLetterText()}
            </div>
            <div className="p-6 flex flex-wrap gap-4 bg-white">
              <button
                onClick={copyToClipboard}
                className="flex-[2] py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                Copy để gửi Zalo
              </button>
              <button
                onClick={downloadFile}
                className="flex-1 py-4 px-6 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-100 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Tải File .txt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
