let items = [
{  "id": "1",
  "firstName": "John",
  "lastName": "Doe",
  "dob": "2024-10-03",        
  "gender": "male",
  "address": "USA",
  "email": "john@gmail.com",
  "phoneNumber": "6767675656",}
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":

      res.status(200).json(items);
      break;
    
    case "POST":
    
      const newItem = {
        id: items.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,        
        gender: req.body.gender,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      };
      items.push(newItem);
      res.status(201).json(newItem);
      break;

    case "PUT":
  
      const { id, firstName, lastName, dob, gender, address, email, phoneNumber } = req.body;
      items = items.map((item) =>
        item.id === id
          ? {
              id,
              firstName,
              lastName,
              dob,
              gender,
              address,
              email,
              phoneNumber,
            }
          : item
      );
      res.status(200).json({ id, firstName, lastName, dob, gender, address, email, phoneNumber });
      break;

    case "DELETE":

      const { id: deleteId } = req.query;
      items = items.filter((item) => item.id !== parseInt(deleteId));
      res.status(204).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
