const links = [
    { name: 'サービス', href: '#1', },
    { name: 'Skill Matchingについて',href: '/dashboard/skill-matching', },
    { name: 'プロフィール編集', href: '/profile-edit', },
    { name: 'お知らせ', href: '#4', },
    { name: 'メッセージ', href: '/sendmessage', },
];

export default function Menu() {
  return (
    <div>
      <div>
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
    </div>
  );
}