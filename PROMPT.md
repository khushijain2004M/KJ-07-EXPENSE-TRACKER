# 07. Expense Tracker — Ledger Night

**स्थिति:** केवल prompt; app अभी build नहीं हुई है।

**Source:** आपकी screenshots की original list  
**Future app folder:** `mini-projects/07-expense-tracker/`  
**Visual palette:** Ink #0D1120, purple #8B5CF6, income blue #38BDF8 और expense red #F43F5E

## Build prompt — उद्देश्य

Personal income/expenses का local-first tracker बनाओ जिसमें usable ledger और visual monthly overview हो। Unique working mini app बनाओ, polished screenshot-only mockup नहीं। पहले [shared Build Standards](../BUILD-STANDARDS.md) पढ़ो और लागू करो। Implementation शुरू करने की अनुमति मिलने पर इस specification से build करना; अभी यह planning document है।

## Layout और UX

Top balance/income/expense metrics; left add-entry form; right transaction list; नीचे category chart और month filter, mobile पर Add entry floating action।

## ज़रूरी working features

- Income/expense entry में amount, date, category, note और optional recurring label; create/edit/delete with undo implement करो।
- Month selector, transaction search, category/type filters और date/amount sorting; combined filters वास्तविक results पर लागू हों।
- Balance और monthly totals filtered period के अनुसार; category donut और cashflow SVG chart accessible text summary के साथ।
- Monthly budget और remaining budget/progress; recurring label automatic payment या background execution का दावा न करे।
- Versioned localStorage data, JSON backup/import validation और CSV export; sample entries केवल explicit Load sample data action पर हों।

## Logic और data behavior

Stable IDs, timestamps और integer minor units इस्तेमाल करो। Aggregations के लिए pure functions; deletion undo expiry और invalid/corrupt backup को safe reject करो।

## Animation और visual personality

Metric count transitions, category chart reveal और transaction row enter/exit; red/pink को numbers पढ़ने योग्य रखें। Default dark theme, readable typography और restrained pink/purple/blue/red accent system रखो; बाकी projects से अलग central layout हो।

## Empty, loading और error states

First-use empty ledger, exceeded budget, storage quota failure, no filtered matches और import errors के states बनाओ।

## Completion checks

Add income/expense, edit category, delete/undo, monthly filtering, exact totals और export/import roundtrip verify करो। Shared checklist के responsive, keyboard, reduced-motion, data-safety और actual upload-size checks भी pass हों।

## बाद की delivery

इस numbered folder को independent runnable app में बदलना। Root `index.html`, local styles/scripts/assets, concise README और honest setup/browser-limit notes शामिल करना। Working preview verify होने के बाद ही Mini Projects में upload/scheduling का अगला चरण होगा; अभी न build, न upload, न deployment।
