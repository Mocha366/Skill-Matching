import "./Menu.css"

const links = [
    { name: 'サービス', href: '/dashboard/Service', },
    { name: 'Skill Matchingについて',href: '/dashboard/skill-matching', },
    { name: 'プロフィール編集', href: '/dashboard/profile-edit', },
    { name: 'お知らせ', href: '/dashboard/Activitie', },
    { name: 'メッセージ', href: '/dashboard/SendMessage', },
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