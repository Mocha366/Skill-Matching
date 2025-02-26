import "./Menu.css"

const links = [
    { name: 'サービス', href: '/dashboard/Service', },
    { name: 'Skill Matchingについて',href: '/dashboard/About', },
    { name: 'プロフィール編集', href: '/dashboard/profile-edit', },
    { name: 'お知らせ', href: '/dashboard/News', },
    { name: 'メッセージ', href: '/dashboard/SendMessage', },
    { name: 'Like', href: '/dashboard/Like', },
];

export default function Menu() {
  return (
    <div className="menu-content">
    {links.map((link) => {
        return (
          <a
            key={link.name}
            href={link.href}
          >
            <p>{link.name}</p>
          </a>
        );
      })}
    </div>
  );
}