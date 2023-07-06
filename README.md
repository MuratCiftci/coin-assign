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

  // Optimizeler

// API Optimizasyonu
Öncellikle data fetching için React Query kullanmamın avantajları oldu. API cache time'ı 45 saniye olan bazılarında 5 dakika olan servislere tekrar tekrar istek atmak hem zaten kısıtlı olan rate limit'imizi etkiliyordu ve gereksiz yere istek atıyorduk çünkü 10 saniye önceki istek değişmiyordu. Veriler 45 saniyede bir güncelleniyordu. Her saniye istek atsak da bize eski veri geleceğinden API'lardaki cache time'a göre kendi servislerime her birinde farklı olacak şekilde cacheTime'lar verdim. Böylece gereksiz yere istek ve bekleme süresinden kurtulmuş olduk. Bunun en büyük avantajını pagination'da gördüm. Çünkü pagination'da genel olarak 1-2-1-2 şeklinde hızlı bir şekilde ilerleyebiliyoruz. Bunu 10 saniye içinde yaparsak 4 tane istek olacaktı ancak kullandığım yöntem ile bunu engellemiş oldum. Az güncellenen haber gibi isteklerde ise cacheTime'ı 1 saate gibi uzun belirledim. Kullanıcılarımızın 1 saate kadar eski verileri görmesinde bir sakınca yoktu. Bu süre tamamen bize ait olduğu için isteğin ne kadar sık güncellenmesi gerektiğini belirleyebiliyorduk.

// Pagination
Yaklaşık 10000 tane coini anasayfada göstermemiz gerekiyordu. Server Side pagination yaparak ve yine sayfalar arası geçişte cache yöntemini kullanarak bunu başardım. Her sayfada 100 tane coin gösterdim. Kullanıcılarımız sayfalar arasında geçiş yaparken tekrar tekrar istek atmak yerine cache'den verileri çekiyor. Bu sayede kullanıcılarımızın sayfalar arası geçişlerde bekleme süresini en aza indirmiş oldum.

// Code Splitting
Next.js'in otomatik olarak yaptığı code splitting ile sadece kullanılan komponentlerin kodları indiriliyor. Bu sayede kullanıcılarımızın ilk açılışta daha hızlı bir şekilde siteye girmesini sağladım. Child component tanımlamaktan kaçınıp yönlendirmeleri Route,Link yöntemlerini kullanarak otomatik olarak code splitting yapmasını sağladım.

// React.Memo 
React.memo kullanmamın sebebi, gereksiz yere re-render oluşmasını engellemekti. Proje compleks bir hale geldikçe re-render oluşma ihtimali artıyordu. Bu yüzden gereksiz yere re-render oluşmasını engellemek için bazı child componentlerde React.memo kullandım.


// Gereksiz UseEffect'lerden Kaçınma
Kullanıcılarımızın gereksiz yere re-render ve side effect oluşmaması için gereksiz useEffect'lerden kaçındım. Eğer bir state güncellenirken diğerini de güncellemek istiyorsam genellikle herkesin sıklıkla yaptığı yanlıştan kaçınıp useEffect kullanmak yerine derive state yöntemini kullandım. Bu sayede gereksiz yere re-render oluşmasını engellemiş oldum. Bu konu ile ilgili dökümanı aşağıda paylaşıyorum.

https://react.dev/learn/you-might-not-need-an-effect


