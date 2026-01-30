
import React from 'react';
import { StudentInfo } from '../types';

interface Props {
  student: StudentInfo;
  index: number;
  onUpdate: (id: string, updates: Partial<StudentInfo>) => void;
  onRemove: (id: string) => void;
}

const StudentForm: React.FC<Props> = ({ student, index, onUpdate, onRemove }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate(student.id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 relative hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">#{index + 1}</span>
          Thông tin học sinh
        </h3>
        {index > 0 && (
          <button 
            onClick={() => onRemove(student.id)}
            className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all flex items-center gap-1 text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Xóa học sinh
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Học sinh nào?</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Ví dụ: Tố Uyên hoặc Tạ Khánh và Mai Hương"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Điểm mạnh là gì?</label>
          <textarea
            name="strengths"
            value={student.strengths}
            onChange={handleChange}
            placeholder="Ví dụ: Vừa thi thử IELTS được 6.0, đang luyện thêm nghe và nói để tăng band"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-28 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Điểm cần khắc phục?</label>
          <textarea
            name="improvements"
            value={student.improvements}
            onChange={handleChange}
            placeholder="Ví dụ: luyện thêm nghe để tăng lên thành 6.0 / Bạn Mai Hương vắng mặt trong vòng 17 ngày..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-28 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Khen ngợi điều gì?</label>
          <input
            type="text"
            name="praise"
            value={student.praise}
            onChange={handleChange}
            placeholder="Ví dụ: Tố Uyên học đều và có cố gắng làm tốt hơn từng ngày."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Đã đóng tiền học đến ngày nào?</label>
          <input
            type="text"
            name="paidUntil"
            value={student.paidUntil}
            onChange={handleChange}
            placeholder="Ví dụ: từ 2/11/25 đến 1/1/2026"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Cần đóng từ ngày đến ngày?</label>
            <input
              type="text"
              name="nextPaymentPeriod"
              value={student.nextPaymentPeriod}
              onChange={handleChange}
              placeholder="Ví dụ: 2/1/26 - 1/2/26"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Với số tiền là?</label>
            <input
              type="text"
              name="nextPaymentAmount"
              value={student.nextPaymentAmount}
              onChange={handleChange}
              placeholder="4.5 triệu đồng"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Chi tiết các buổi học là?</label>
          <textarea
            name="sessionDetails"
            value={student.sessionDetails}
            onChange={handleChange}
            placeholder="Ví dụ: Từ 1/1 - 8/1 (4 buổi) : 4 MH, 5 TKMH... Từ 5/12 - 31/12: 16.5 buổi..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-24 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Ghi chú?</label>
          <textarea
            name="note"
            value={student.note}
            onChange={handleChange}
            placeholder="Ví dụ: anh sẽ bố trí cho bạn thi thử... hoặc bạn Mai Hương vắng hơn 17 ngày không thấy thông báo..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-24 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Cam kết?</label>
          <input
            type="text"
            name="commitment"
            value={student.commitment}
            onChange={handleChange}
            placeholder="Ví dụ: Cam kết của anh là nếu bạn Tố Uyên không đạt 5.5 trước 17/2/26 thì anh sẽ dạy miễn phí..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Chiến lược sắp tới?</label>
          <input
            type="text"
            name="strategy"
            value={student.strategy}
            onChange={handleChange}
            placeholder="Ví dụ: anh ghi chú lại các buổi học và cho bạn luyện nhiều hơn về reading và speaking."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
