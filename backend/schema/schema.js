const graphql = require("graphql");
const Stud_Profile = require("../Models/StudProfileModel");
const Comp_Profile = require("../Models/CompProfileModel");
const Job = require("../Models/JobModel");
const ApplicationModel = require("../Models/ApplicationModel");
const { login } = require("../Mutations/login");
const { CompLogin } = require("../Mutations/loginComp");
const { compUpdate } = require("../Mutations/compUpdate");
const { addJobs } = require("../Mutations/addJobs");
const { apply } = require("../Mutations/apply");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    _id: { type: GraphQLID },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLInt },
    dob: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    obj: { type: GraphQLString },
    school_info: {
      type: new GraphQLList(StudentEdu),
      resolve(parent, args) {
        return parent.school_info;
      },
    },
    work_exp: {
      type: new GraphQLList(StudentExp),
      resolve(parent, args) {
        return parent.work_exp;
      },
    },
  }),
});

const StudentEdu = new GraphQLObjectType({
  name: "StudentEdu",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    degree: { type: GraphQLString },
    major: { type: GraphQLString },
    yop: { type: GraphQLString },
    CGPA: { type: GraphQLString },
    fromMonth: { type: GraphQLString },
    fromYear: { type: GraphQLString },
    toMonth: { type: GraphQLString },
    toYear: { type: GraphQLString },
  }),
});

const StudentExp = new GraphQLObjectType({
  name: "StudentExp",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    location: { type: GraphQLString },
    work_des: { type: GraphQLString },
    fromMonth: { type: GraphQLString },
    fromYear: { type: GraphQLString },
    toMonth: { type: GraphQLString },
    toYear: { type: GraphQLString },
  }),
});

const CompProfileModel = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    _id: { type: GraphQLID },
    cname: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    website: { type: GraphQLString },
    desc: { type: GraphQLString },
    noofemp: { type: GraphQLString },
    owner_ship: { type: GraphQLString },
    company_type: { type: GraphQLString },
  }),
});

const Jobs = new GraphQLObjectType({
  name: "Jobs",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    deadline: { type: GraphQLString },
    location: { type: GraphQLString },
    salary: { type: GraphQLString },
    desc: { type: GraphQLString },
    paid: { type: GraphQLString },
    job_cat: { type: GraphQLString },
    company_name: { type: GraphQLString },
    email: { type: GraphQLString },
    comp_id: { type: GraphQLString },
  }),
});

const applyJobs = new GraphQLObjectType({
  name: "apply",
  fields: () => ({
    idcompany: { type: GraphQLString },
    idstudent: { type: GraphQLString },
    idjob: { type: GraphQLString },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
  }),
});

const StatusType = new GraphQLObjectType({
  name: "Status",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    student: {
      type: StudentType,
      args: { _id: { type: GraphQLID } },
      async resolve(parent, args) {
        let user = await Stud_Profile.findById(args._id);
        if (user) {
          return user;
        }
      },
    },
    company: {
      type: CompProfileModel,
      args: { _id: { type: GraphQLID } },
      async resolve(parent, args) {
        let user = await Comp_Profile.findById(args._id);
        if (user) {
          return user;
        }
      },
    },
    allStudent: {
      type: new GraphQLList(StudentType),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        let studentsList = await Stud_Profile.find({
          $or: [
            {
              fname: { $regex: ".*" + args.name + ".*", $options: "i" },
            },
            {
              lname: { $regex: ".*" + args.name + ".*", $options: "i" },
            },
            {
              "school_info.name": {
                $regex: ".*" + args.name + ".*",
                $options: "i",
              },
            },
          ],
        });

        return studentsList;
      },
    },
    allJobs: {
      type: new GraphQLList(Jobs),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        let JobsList = await Job.find({
          $or: [
            {
              title: { $regex: ".*" + args.name + ".*", $options: "i" },
            },
            {
              company_name: { $regex: ".*" + args.name + ".*", $options: "i" },
            },
          ],
        });

        return JobsList;
      },
    },
    applied: {
      type: new GraphQLList(applyJobs),
      args: {
        idjob: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args.idjob);
        let applied = await ApplicationModel.find({
          $or: [
            {
              idjob: { $regex: ".*" + args.idjob + ".*", $options: "i" },
            },
          ],
        });
        console.log(applied);
        return applied;
      },
    },
    studentApplied: {
      type: new GraphQLList(applyJobs),
      args: {
        idstudent: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log(args.idjob);
        let applied = await ApplicationModel.find({
          $or: [
            {
              idstudent: {
                $regex: ".*" + args.idstudent + ".*",
                $options: "i",
              },
            },
          ],
        });
        console.log(applied);
        return applied;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCompany: {
      type: StatusType,
      args: {
        cname: { type: GraphQLString },
        location: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        //console.log("Stud Signup" + args);
        var newuser = new Comp_Profile({
          cname: args.cname,
          password: args.password,
          email: args.email,
          location: args.location,
        });
        newuser.save((error, data) => {
          if (data) {
            return { status: 200, message: "USER_ADDED" };
          } else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          }
        });
      },
    },
    addStudent: {
      type: StatusType,
      args: {
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        sname: { type: GraphQLString },
      },
      resolve(parent, args) {
        //console.log("Stud Signup" + args);
        var newuser = new Stud_Profile({
          fname: args.fname,
          lname: args.lname,
          password: args.password,
          email: args.email,
          school_info: [{ name: args.sname }],
          work_exp: [{ name: "Add work exp" }],
        });
        newuser.save((error, data) => {
          if (data) {
            return { status: 200, message: "USER_ADDED" };
          } else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          }
        });
      },
    },
    login: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return login(args);
      },
    },
    compLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return CompLogin(args);
      },
    },
    updateEduMutation: {
      type: StatusType,
      args: {
        user_id: { type: GraphQLString },
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        degree: { type: GraphQLString },
        major: { type: GraphQLString },
        yop: { type: GraphQLString },
        CGPA: { type: GraphQLString },
        fromMonth: { type: GraphQLString },
        fromYear: { type: GraphQLString },
        toMonth: { type: GraphQLString },
        toYear: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("Stud Signup" + args);
        Stud_Profile.findOneAndUpdate(
          { _id: args.user_id, "school_info._id": args._id },
          {
            $set: {
              "school_info.$.name": args.name,
              "school_info.$.degree": args.degree,
              "school_info.$.major": args.major,
              "school_info.$.yop": args.yop,
              "school_info.$.CGPA": args.CGPA,
              "school_info.$.fromMonth": args.fromMonth,
              "school_info.$.fromYear": args.fromYear,
              "school_info.$.toMonth": args.toMonth,
              "school_info.$.toYear": args.toYear,
            },
          },
          async (error, user) => {
            if (error) {
              return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            } else {
              return { status: 200, message: "UPDATED" };
            }
          }
        );
      },
    },
    updateExpMutation: {
      type: StatusType,
      args: {
        user_id: { type: GraphQLString },
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        title: { type: GraphQLString },
        location: { type: GraphQLString },
        work_des: { type: GraphQLString },
        fromMonth: { type: GraphQLString },
        fromYear: { type: GraphQLString },
        toMonth: { type: GraphQLString },
        toYear: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log("Stud Signup" + args.fromMonth);
        Stud_Profile.findOneAndUpdate(
          { _id: args.user_id, "work_exp._id": args._id },
          {
            $set: {
              "work_exp.$.name": args.name,
              "work_exp.$.title": args.title,
              "work_exp.$.location": args.location,
              "work_exp.$.work_des": args.work_des,
              "work_exp.$.fromMonth": args.fromMonth,
              "work_exp.$.fromYear": args.fromYear,
              "work_exp.$.toMonth": args.toMonth,
              "work_exp.$.toYear": args.toYear,
            },
          },
          async (error, user) => {
            if (error) {
              return { status: 500, message: "INTERNAL_SERVER_ERROR" };
            } else {
              return { status: 200, message: "UPDATED" };
            }
          }
        );
      },
    },
    updateContact: {
      type: StatusType,
      args: {
        user_id: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        obj: { type: GraphQLString },
      },
      async resolve(parent, args) {
        console.log("Stud Signup" + args.obj);
        Stud_Profile.findOne({ _id: args.user_id }, async (error, user) => {
          if (error) {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          } else {
            user.phone = args.phone;
            user.email = args.email;
            user.obj = args.obj;
            await user.save();
            return { status: 200, message: "UPDATED" };
          }
        });
      },
    },
    updateProfile: {
      type: StatusType,
      args: {
        user_id: { type: GraphQLString },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        dob: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      async resolve(parent, args) {
        //console.log("Stud Signup" + args);
        Stud_Profile.findOne({ _id: args.user_id }, async (error, user) => {
          if (error) {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
          } else {
            user.fname = args.fname;
            user.lname = args.lname;
            user.dob = args.dob;
            user.city = args.city;
            user.state = args.state;
            user.country = args.country;
            await user.save();
            return { status: 200, message: "UPDATED" };
          }
        });
      },
    },
    updateCompanyProfile: {
      type: StatusType,
      args: {
        _id: { type: GraphQLString },
        cname: { type: GraphQLString },
        location: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        website: { type: GraphQLString },
        desc: { type: GraphQLString },
        noofemp: { type: GraphQLString },
        owner_ship: { type: GraphQLString },
        company_type: { type: GraphQLString },
      },
      async resolve(parent, args) {
        //console.log(args);
        return compUpdate(args);
      },
    },
    addJob: {
      type: StatusType,
      args: {
        title: { type: GraphQLString },
        deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        desc: { type: GraphQLString },
        paid: { type: GraphQLString },
        job_cat: { type: GraphQLString },
        comp_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await addJobs(args);
      },
    },
    apply: {
      type: StatusType,
      args: {
        idcompany: { type: GraphQLString },
        idstudent: { type: GraphQLString },
        idjob: { type: GraphQLString },
      },
      async resolve(parent, args) {
        //console.log(args);
        return apply(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
