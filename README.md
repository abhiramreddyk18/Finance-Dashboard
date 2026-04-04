Finance Dashboard

This project is like a finance dashboard I created using React and Vite. It is mainly used to track financial things like income and expense and all. I tried to make it simple but also useful to understand where money is going.

Tech Stack

I used React for UI and Vite for running fast. Also used Recharts for graphs like line and pie chart. React Router is there for page changing. Icons I used from react icons. Styling I just did with normal CSS not any framework.

Features
Dashboard

In dashboard it shows some cards like total balance, income and expense. Also there is one line chart which shows how balance is changing day by day but yeah data is not real its static.

Also one pie chart is there which shows spending based on categories like food, travel etc.

Transactions

There is a table which shows all transactions like date, category, type and amount.

User can search also but only by category name. Filter also added like income or expense or all. Sorting also there for date and amount but not very advanced sorting just basic.

If no data then it shows empty message.

Insights

This part shows some analysis type things.

Like which category user spent more money. Then monthly comparison also there income vs expense and it shows saving also but calculation is simple only.

Also shows biggest expense one time and average daily spending. Transaction count also there but nothing too complex.

Role Based UI

I added role system but only frontend simulation.

There is dropdown in header. If user selects viewer then only can see data. If admin then can add and delete transactions.

This is not real authentication just simple condition.

State Management

Used Context API for storing data.

All transactions are stored there and also role. From there only all components taking data.

No redux or anything because project is small.

Project Structure

I created folders like context, components, pages and styles.

Inside pages there are dashboard, transaction and insights. Context file handles all data.

Not followed very strict architecture but tried to keep it clean.

Setup

First clone project then run npm install and then npm run dev. It will start on localhost.

Design

UI I kept very simple not too fancy. Used normal CSS. No tailwind or bootstrap.

Logic also simple only like for loops and if else. No advanced optimization or anything.

Tried to separate code but still some parts can be better.

Responsive

It works in mobile also but maybe not perfect in all screen sizes. Cards go one below another in small screen. Charts also adjust somehow.