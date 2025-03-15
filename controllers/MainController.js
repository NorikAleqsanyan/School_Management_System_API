const UserDto = require("../dtos/user-dto");
const tokenService = require("./../service/token-service");

class MainController {
  static async login(req, res) {
    try {
      if (comp) {
        const userDto = new UserDto(req.user);
        const tokens = await tokenService.generateToken({
          ...userDto,
        });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        userDto.refreshToken = tokens.refreshToken;
        res.send(userDto);
      } else {
        res.send({
          error: "Wrong Username and/or Password",
        });
      }
    } catch (err) {}
  }
}
module.exports = { MainController };
