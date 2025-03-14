import {
  PiGhost,
  PiFlask,
  PiHeart,
  PiSoccerBall,
  PiCookingPot,
  PiPuzzlePiece,
  PiBooks,
  PiClockCounterClockwise,
  PiTranslate,
} from "react-icons/pi";

export const genres = [
  {
    slug: "fiction",
    displayName: "Tiểu thuyết",
    icon: <PiBooks />,
    description:
      "Bước vào thế giới của những câu chuyện hư cấu, nơi trí tưởng tượng không có giới hạn. Từ những cuộc phiêu lưu kỳ thú đến những câu chuyện tình cảm sâu sắc, tiểu thuyết mang đến cho bạn những trải nghiệm khó quên.",
  },
  {
    slug: "science",
    displayName: "Khoa học",
    icon: <PiFlask />,
    description:
      "Khám phá những bí ẩn của vũ trụ, từ những hạt hạ nguyên tử nhỏ bé đến những thiên hà rộng lớn. Tìm hiểu về các định luật tự nhiên, các phát minh khoa học và những khám phá thay đổi thế giới.",
  },
  {
    slug: "sport",
    displayName: "Thể thao",
    icon: <PiSoccerBall />,
    description:
      "Cảm nhận tinh thần thể thao qua những câu chuyện về các vận động viên xuất sắc, những trận đấu kịch tính và những khoảnh khắc vinh quang. Tìm hiểu về các môn thể thao khác nhau và khám phá niềm đam mê của bạn.",
  },
  {
    slug: "language",
    displayName: "Ngoại ngữ",
    icon: <PiTranslate />,
    description:
      "Mở rộng vốn từ vựng, cải thiện kỹ năng giao tiếp và khám phá những nền văn hóa mới thông qua việc học ngoại ngữ. Từ tiếng Anh thông dụng đến những ngôn ngữ độc đáo, hãy bắt đầu hành trình chinh phục ngôn ngữ của bạn.",
  },
  {
    slug: "history",
    displayName: "Lịch sử",
    icon: <PiClockCounterClockwise />,
    description:
      "Du hành ngược thời gian để tìm hiểu về những sự kiện, nhân vật và giai đoạn lịch sử quan trọng. Khám phá những câu chuyện về các đế chế hùng mạnh, những cuộc chiến tranh khốc liệt và những nhà lãnh đạo vĩ đại.",
  },
  {
    slug: "cooking",
    displayName: "Nấu ăn",
    icon: <PiCookingPot />,
    description:
      "Học cách chế biến những món ăn ngon từ khắp nơi trên thế giới. Từ những món ăn truyền thống đến những món ăn hiện đại, hãy biến căn bếp của bạn thành một nhà hàng 5 sao.",
  },

  {
    slug: "children",
    displayName: "Thiếu nhi",
    icon: <PiPuzzlePiece />,
    description:
      "Mang đến cho trẻ em những cuốn sách đầy màu sắc, những câu chuyện hấp dẫn và những bài học bổ ích. Từ truyện cổ tích đến truyện tranh, hãy cùng trẻ em khám phá thế giới kỳ diệu của sách.",
  },
  {
    slug: "horror",
    displayName: "Kinh dị",
    icon: <PiGhost />,
    description:
      "Thử thách lòng dũng cảm của bạn với những câu chuyện kinh dị rùng rợn. Từ những con ma bí ẩn đến những kẻ giết người hàng loạt, hãy chuẩn bị cho những đêm mất ngủ.",
  },
  {
    slug: "love",
    displayName: "Lãng mạn",
    icon: <PiHeart />,
    description:
      "Đắm chìm trong những câu chuyện tình yêu ngọt ngào, lãng mạn và đầy cảm xúc. Từ những mối tình đầu ngây thơ đến những tình yêu vượt qua mọi thử thách, hãy tin vào sức mạnh của tình yêu.",
  },
];

export function checkValidGenre(slug) {
  return genres.some((genre) => genre.slug === slug);
}

export function getGenreDisplayName(slug) {
  return (
    genres.find((genre) => genre.slug === slug)?.displayName ||
    "Thể loại không tồn tại"
  );
}
