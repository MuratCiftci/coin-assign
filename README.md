This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo 
[Demo] (https://coin-assign.vercel.app/) Projeyi bu linkten inceleyebilirsiniz.

## Kullanılan Kütüphaneler

- [NEXT-UI](https://nextui.org/) - UI Kütüphanesi
  Next UI kulllanmamın sebebi, modern tasarıma sahip, içinde bir çok komponenti barındırması ve kolay kullanılabilir olmasıdır.

- [React-Query] (https://react-query.tanstack.com/) - Cache ve API Kütüphanesi
  React-Query kullanmamın sebebi, verileri cacheleyerek tekrar tekrar istek atmayı engellemesi, lifecycle fonksiyonları ile verileri istediğimiz gibi yönetebilmesi ve kolay kullanılabilir olmasıdır. Kullanmamın sebebini bir makalemde ayrıntılı bir şekilde anlatmıştım.
  https://muratciftci.notion.site/Neden-Redux-yerine-React-Query-Kullan-yorum-Server-State-ler-i-in-94ca6e438712404db0abf61fb9c9f60c

- [Dayjs] (https://day.js.org/) - Tarih Kütüphanesi
  Dayjs kullanmamın sebebi, tarihleri kolay bir şekilde yönetebilmesi ve moment kütüphanesinin modern ve hafif bir alternatifi olmasıdır. ( Moment yaklaşık 300kb iken Dayjs 2kb'dır. )

- [React-hot-toast] (https://react-hot-toast.com/) - Bildirim Kütüphanesi
  Kullanmamın sebebi, kolay kullanılabilir olması, hafif olması ve modern tasarıma sahip olmasıdır.

- [Rechart] (https://recharts.org/en-US/) - Grafik Kütüphanesi
  Kullanmamın sebebi, içinde çok güzel line chart barındırması ve React ile uyumlu olmasıdır.

- [Zustand] (https://docs.pmnd.rs/zustand/getting-started/introduction) - State Management Kütüphanesi
  Context.API'dan farklı olarak child komponentlerin gereksiz yere re-render olmasını engellemesi, Provider yapısına ihtiyaç duymaması ve kolay kullanılabilir olmasıdır.

- [Prisma] (https://www.prisma.io/) - ORM Kütüphanesi
  Kullanmamın sebebi, haberleri PlanetScale veritabanı üzerinde tuttuğum için, PlanetScale ile uyumlu olması ve kolay kullanılabilir olmasıdır. Ayrıca ORM kullanmamın sebebi, veritabanı işlemlerini daha kolay ve güvenli bir şekilde yapabilmektir.