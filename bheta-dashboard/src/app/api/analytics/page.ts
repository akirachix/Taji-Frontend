
export default function handler(req, res) {
    const monthData = {
      January: [3, 5, 8, 10, 12],
      February: [2, 4, 6, 8, 10],
      March: [1, 3, 5, 7, 9],
      April: [5, 6, 8, 11, 14],
      May: [7, 9, 12, 13, 16],
      June: [10, 12, 14, 16, 18],
      July: [8, 7, 9, 12, 13],
      August: [6, 8, 10, 11, 14],
      September: [4, 5, 7, 9, 12],
      October: [3, 6, 9, 12, 15],
      November: [5, 7, 9, 13, 17],
      December: [6, 9, 11, 14, 18],
    };
  
    res.status(200).json(monthData);
  }
  